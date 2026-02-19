using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore; // ✅ required for FirstOrDefaultAsync, ToListAsync, etc.
using LISBOMWebAPI.Models;
using LISBOMWebAPI.Data;

[Route("api/[controller]")]
[ApiController]
public class PartStructuresController : ControllerBase
{
    private readonly BOMDbContext _context;

    public PartStructuresController(BOMDbContext context)
    {
        _context = context;
    }

    // GET: api/PartStructures
    [HttpGet]
    public async Task<ActionResult<IEnumerable<PartStructure>>> GetPartStructures()
    {
        return await _context.PartStructures
            .OrderBy(p => p.Part)
            .ThenBy(p => p.Task)
            .ThenBy(p => p.TaskReference)
            .ToListAsync();
    }

    // POST: api/PartStructures
    [HttpPost]
    public async Task<ActionResult<PartStructure>> PostPartStructure(PartStructure structure)
    {
        _context.PartStructures.Add(structure);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetPartStructures), new { part = structure.Part, task = structure.Task, component = structure.Component }, structure);
    }

    // PUT: api/PartStructures/{part}/{task}/{component}
    [HttpPut("{part}/{task}/{component}")]
    public async Task<IActionResult> UpdatePartStructure(string part, short task, string component, PartStructure entity)
    {
        var existing = await _context.PartStructures
            .FirstOrDefaultAsync(p => p.Part == part && p.Task == task && p.Component == component);

        if (existing == null) return NotFound();

        // Update all editable fields including EffStart and EffClose
        existing.TaskReference = entity.TaskReference;
        existing.Quantity = entity.Quantity;
        existing.EcnStart = entity.EcnStart;
        existing.EffStart = entity.EffStart;
        existing.EcnClose = entity.EcnClose;
        existing.EffClose = entity.EffClose;
        existing.EcnStatus = entity.EcnStatus;
        existing.EngConcession = entity.EngConcession;
        existing.LastMaint = entity.LastMaint;
        existing.LastMaintLogon = entity.LastMaintLogon;
        existing.DateAdded = entity.DateAdded;

        await _context.SaveChangesAsync();
        return NoContent();
    }

    // DELETE: api/PartStructures/{part}/{task}/{component}
    [HttpDelete("{part}/{task}/{component}")]
    public async Task<IActionResult> DeletePartStructure(string part, short task, string component)
    {
        var entity = await _context.PartStructures
            .FirstOrDefaultAsync(p => p.Part == part && p.Task == task && p.Component == component);

        if (entity == null) return NotFound();

        _context.PartStructures.Remove(entity);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}

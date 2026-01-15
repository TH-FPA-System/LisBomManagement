using LISBOMWebAPI.Data;
using LISBOMWebAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class PartStructuresController : ControllerBase
{
    private readonly BOMDbContext _context;

    public PartStructuresController(BOMDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<PartStructure>>> GetPartStructures()
    {
        return await _context.PartStructures.ToListAsync();
    }

    [HttpGet("{part}/{task}/{taskRef}/{component}/{effStart}/{effClose}")]
    public async Task<ActionResult<PartStructure>> GetPartStructure(
        string part, short task, string taskRef, string component, DateTime effStart, DateTime effClose)
    {
        var entity = await _context.PartStructures.FindAsync(part, task, taskRef, component, effStart, effClose);
        if (entity == null) return NotFound();
        return entity;
    }

    [HttpPost]
    public async Task<ActionResult<PartStructure>> CreatePartStructure(PartStructure entity)
    {
        _context.PartStructures.Add(entity);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetPartStructure), new
        {
            part = entity.Part,
            task = entity.Task,
            taskRef = entity.TaskReference,
            component = entity.Component,
            effStart = entity.EffStart,
            effClose = entity.EffClose
        }, entity);
    }

    [HttpPut("{part}/{task}/{taskRef}/{component}/{effStart}/{effClose}")]
    public async Task<IActionResult> UpdatePartStructure(string part, short task, string taskRef, string component, DateTime effStart, DateTime effClose, PartStructure entity)
    {
        if (part != entity.Part || task != entity.Task || taskRef != entity.TaskReference || component != entity.Component || effStart != entity.EffStart || effClose != entity.EffClose)
            return BadRequest();

        _context.Entry(entity).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{part}/{task}/{taskRef}/{component}/{effStart}/{effClose}")]
    public async Task<IActionResult> DeletePartStructure(string part, short task, string taskRef, string component, DateTime effStart, DateTime effClose)
    {
        var entity = await _context.PartStructures.FindAsync(part, task, taskRef, component, effStart, effClose);
        if (entity == null) return NotFound();
        _context.PartStructures.Remove(entity);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}

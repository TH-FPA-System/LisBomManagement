using LISBOMWebAPI.Data;
using LISBOMWebAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class PartsController : ControllerBase
{
    private readonly BOMDbContext _context;

    public PartsController(BOMDbContext context)
    {
        _context = context;
    }

    // GET: api/Parts
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Part>>> GetParts()
    {
        return await _context.Parts
                         .OrderBy(p => p.PartCode)                          
                         .ToListAsync();
    }

    // GET: api/Parts/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Part>> GetPart(string id)
    {
        var part = await _context.Parts.FindAsync(id);
        if (part == null) return NotFound();
        return part;
    }

    // POST: api/Parts
    [HttpPost]
    public async Task<ActionResult<Part>> PostPart(Part part)
    {
        _context.Parts.Add(part);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetPart), new { id = part.PartCode }, part);
    }

    // PUT: api/Parts/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutPart(string id, Part part)
    {
        if (id != part.PartCode) return BadRequest();

        _context.Entry(part).State = EntityState.Modified;
        try { await _context.SaveChangesAsync(); }
        catch (DbUpdateConcurrencyException)
        {
            if (!_context.Parts.Any(e => e.PartCode == id)) return NotFound();
            else throw;
        }
        return NoContent();
    }

    // DELETE: api/Parts/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePart(string id)
    {
        var part = await _context.Parts.FindAsync(id);
        if (part == null) return NotFound();

        _context.Parts.Remove(part);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}

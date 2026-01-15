using LISBOMWebAPI.Data;
using LISBOMWebAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class PartPropertyDatasController : ControllerBase
{
    private readonly BOMDbContext _context;

    public PartPropertyDatasController(BOMDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<PartPropertyData>>> GetProperties()
    {
        return await _context.PartPropertyDatas.ToListAsync();
    }

    [HttpGet("{part}/{property}")]
    public async Task<ActionResult<PartPropertyData>> GetProperty(string part, string property)
    {
        var entity = await _context.PartPropertyDatas.FindAsync(part, property);
        if (entity == null) return NotFound();
        return entity;
    }

    [HttpPost]
    public async Task<ActionResult<PartPropertyData>> CreateProperty(PartPropertyData entity)
    {
        _context.PartPropertyDatas.Add(entity);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetProperty), new { part = entity.Part, property = entity.Property }, entity);
    }

    [HttpPut("{part}/{property}")]
    public async Task<IActionResult> UpdateProperty(string part, string property, PartPropertyData entity)
    {
        if (part != entity.Part || property != entity.Property) return BadRequest();
        _context.Entry(entity).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{part}/{property}")]
    public async Task<IActionResult> DeleteProperty(string part, string property)
    {
        var entity = await _context.PartPropertyDatas.FindAsync(part, property);
        if (entity == null) return NotFound();
        _context.PartPropertyDatas.Remove(entity);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}

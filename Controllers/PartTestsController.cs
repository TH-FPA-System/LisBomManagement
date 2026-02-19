using LISBOMWebAPI.Data;
using LISBOMWebAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class PartTestsController : ControllerBase
{
    private readonly BOMDbContext _context;

    public PartTestsController(BOMDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<PartTest>>> GetPartTests()
    {
        return await _context.PartTests
            .OrderBy(p => p.Part)
            .ThenBy(p => p.PartIssue)
            .ThenBy(p => p.TestTag)
            .ToListAsync();
    }

    [HttpGet("{part}/{partIssue}")]
    public async Task<ActionResult<PartTest>> GetPartTest(string part, string partIssue)
    {
        var entity = await _context.PartTests.FindAsync(part, partIssue);
        if (entity == null) return NotFound();
        return entity;
    }

    [HttpPost]
    public async Task<ActionResult<PartTest>> CreatePartTest(PartTest entity)
    {
        _context.PartTests.Add(entity);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetPartTest), new { part = entity.Part, partIssue = entity.PartIssue }, entity);
    }

    [HttpPut("{part}/{partIssue}")]
    public async Task<IActionResult> UpdatePartTest(string part, string partIssue, PartTest entity)
    {
        if (part != entity.Part || partIssue != entity.PartIssue) return BadRequest();
        _context.Entry(entity).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{part}/{partIssue}")]
    public async Task<IActionResult> DeletePartTest(string part, string partIssue)
    {
        var entity = await _context.PartTests.FindAsync(part, partIssue);
        if (entity == null) return NotFound();
        _context.PartTests.Remove(entity);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}

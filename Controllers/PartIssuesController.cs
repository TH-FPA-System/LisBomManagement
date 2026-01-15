using LISBOMWebAPI.Data;
using LISBOMWebAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class PartIssuesController : ControllerBase
{
    private readonly BOMDbContext _context;

    public PartIssuesController(BOMDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<PartIssue>>> GetPartIssues()
    {
        return await _context.PartIssues.ToListAsync();
    }

    [HttpGet("{part}/{issueCode}")]
    public async Task<ActionResult<PartIssue>> GetPartIssue(string part, string issueCode)
    {
        var entity = await _context.PartIssues.FindAsync(part, issueCode);
        if (entity == null) return NotFound();
        return entity;
    }

    [HttpPost]
    public async Task<ActionResult<PartIssue>> CreatePartIssue(PartIssue entity)
    {
        _context.PartIssues.Add(entity);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetPartIssue), new { part = entity.Part, issueCode = entity.PartIssueCode }, entity);
    }

    [HttpPut("{part}/{issueCode}")]
    public async Task<IActionResult> UpdatePartIssue(string part, string issueCode, PartIssue entity)
    {
        if (part != entity.Part || issueCode != entity.PartIssueCode) return BadRequest();
        _context.Entry(entity).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{part}/{issueCode}")]
    public async Task<IActionResult> DeletePartIssue(string part, string issueCode)
    {
        var entity = await _context.PartIssues.FindAsync(part, issueCode);
        if (entity == null) return NotFound();
        _context.PartIssues.Remove(entity);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}

using LISBOMWebAPI.Data;
using LISBOMWebAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LISBOMWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PartMapController : ControllerBase
    {
        private readonly BOMDbContext _context;

        public PartMapController(BOMDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PartMap>>> GetPartMaps()
        {
            return await _context.PartMaps
                .OrderBy(p => p.Part)
                .ThenBy(p => p.LisBOMPart)
                .ThenBy(p => p.StoreLocation)
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PartMap>> GetPartMap(int id)
        {
            var map = await _context.PartMaps.FindAsync(id);
            if (map == null) return NotFound();
            return map;
        }

        [HttpPost]
        public async Task<ActionResult<PartMap>> PostPartMap(PartMap map)
        {
            if (string.IsNullOrEmpty(map.CreatedBy))
                map.CreatedBy = "SYSTEM"; // or get from logged-in user

            if (map.CreatedDate == default)
                map.CreatedDate = DateTime.Now;

            _context.PartMaps.Add(map);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPartMap), new { id = map.MapId }, map);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> PutPartMap(int id, PartMap map)
        {
            if (id != map.MapId)
                return BadRequest();

            // Fetch existing record from DB
            var existingMap = await _context.PartMaps.AsNoTracking().FirstOrDefaultAsync(m => m.MapId == id);
            if (existingMap == null)
                return NotFound();

            // Preserve audit fields if client didn't send them
            map.CreatedBy = string.IsNullOrEmpty(map.CreatedBy) ? existingMap.CreatedBy : map.CreatedBy;
            map.CreatedDate = map.CreatedDate == default ? existingMap.CreatedDate : map.CreatedDate;

            map.UpdatedDate = DateTime.Now;

            _context.Entry(map).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await _context.PartMaps.AnyAsync(e => e.MapId == id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePartMap(int id)
        {
            var map = await _context.PartMaps.FindAsync(id);
            if (map == null) return NotFound();

            _context.PartMaps.Remove(map);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}

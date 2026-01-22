using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LISBOMWebAPI.Models
{
    [Table("LISBOM_Part_Map")]
    public class PartMap
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("map_id")]
        public int MapId { get; set; }

        [Column("lisbom_part")]
        [Required]
        public string LisBOMPart { get; set; } = null!;

        [Column("part")]
        [Required]
        public string Part { get; set; } = null!;

        [Column("store_location")]
        public string? StoreLocation { get; set; }

        [Column("is_active")]
        public bool IsActive { get; set; } = true;

        [Column("effective_date")]
        public DateTime? EffectiveDate { get; set; }

        [Column("created_by")]
        [Required]
        public string CreatedBy { get; set; } = "SYSTEM";  // default user


        [Column("created_date")]
        public DateTime CreatedDate { get; set; } = DateTime.Now;

        [Column("updated_date")]
        public DateTime? UpdatedDate { get; set; }
    }
}

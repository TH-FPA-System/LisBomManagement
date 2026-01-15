using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LISBOMWebAPI.Models
{
    [Table("LISBOM_part")]
    public class Part
    {
        [Key]
        [Column("part")]
        public string PartCode { get; set; } = null!;  // required

        [Column("description")]
        public string Description { get; set; } = null!;

        [Column("unit_measure")]
        public string? UnitMeasure { get; set; }  // nullable

        [Column("class")]
        public string Class { get; set; } = null!;

        [Column("primary_role")]
        public string PrimaryRole { get; set; } = null!;

        [Column("date_added")]
        public DateTime DateAdded { get; set; } = DateTime.Now;
    }
}

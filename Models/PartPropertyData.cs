using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LISBOMWebAPI.Models
{
    [Table("LISBOM_part_property_data")]
    public class PartPropertyData
    {
        [Key, Column("part", Order = 0)]
        public string Part { get; set; } = null!;

        [Key, Column("property", Order = 1)]
        public string Property { get; set; } = null!;

        [Column("property_value")]
        public string PropertyValue { get; set; } = null!;
    }
}

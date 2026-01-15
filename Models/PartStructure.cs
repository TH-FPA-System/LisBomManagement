using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LISBOMWebAPI.Models
{
    [Table("LISBOM_part_structure")]
    public class PartStructure
    {
        [Key, Column("part", Order = 0)]
        public string Part { get; set; } = null!;

        [Key, Column("task", Order = 1)]
        public short Task { get; set; }

        [Key, Column("component", Order = 2)]  // ✅ Only this key now
        public string Component { get; set; } = null!;

        [Column("task_reference")]
        public string TaskReference { get; set; } = null!;

        [Column("quantity")]
        public float Quantity { get; set; }

        [Column("ecn_start")]
        public int EcnStart { get; set; }

        [Column("eff_start")]
        public DateTime EffStart { get; set; }   // ✅ now editable

        [Column("ecn_close")]
        public int EcnClose { get; set; }

        [Column("eff_close")]
        public DateTime EffClose { get; set; }   // ✅ now editable

        [Column("ecn_status")]
        public string EcnStatus { get; set; } = null!;

        [Column("eng_concession")]
        public int? EngConcession { get; set; }

        [Column("last_maint")]
        public DateTime LastMaint { get; set; }

        [Column("last_maint_logon")]
        public string LastMaintLogon { get; set; } = null!;

        [Column("date_added")]
        public DateTime DateAdded { get; set; }
    }
}

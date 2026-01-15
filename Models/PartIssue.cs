using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("LISBOM_part_issue")]
public class PartIssue
{
    [Key]
    [Column("part")] // matches SQL column
    public string Part { get; set; } = null!;

    [Key]
    [Column("part_issue")]
    public string PartIssueCode { get; set; } = null!;

    [Column("drawing")]
    public string Drawing { get; set; } = null!;

    [Column("drawing_issue")]
    public string DrawingIssue { get; set; } = null!;

    [Column("ecn_start")]
    public int EcnStart { get; set; }

    [Column("eff_start")]
    public DateTime EffStart { get; set; }

    [Column("ecn_close")]
    public int EcnClose { get; set; }

    [Column("eff_close")]
    public DateTime EffClose { get; set; }

    [Column("ecn_status")]
    public string EcnStatus { get; set; } = null!;

    [Column("last_maint")]
    public DateTime LastMaint { get; set; }

    [Column("last_maint_logon")]
    public string LastMaintLogon { get; set; } = null!;
}

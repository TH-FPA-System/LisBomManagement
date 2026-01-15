using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LISBOMWebAPI.Models
{
    [Table("LISBOM_part_test")]
    public class PartTest
    {
        [Key, Column("part", Order = 0)]
        public string Part { get; set; } = null!;

        [Key, Column("part_issue", Order = 1)]
        public string PartIssue { get; set; } = null!;

        [Column("test_type")]
        public string TestType { get; set; } = null!;

        [Column("abort_on_fail")]
        public string AbortOnFail { get; set; } = null!;

        [Column("number_retries")]
        public int NumberRetries { get; set; }

        [Column("record_result")]
        public string RecordResult { get; set; } = null!;

        [Column("verification_type")]
        public string VerificationType { get; set; } = null!;

        [Column("logical_function")]
        public string? LogicalFunction { get; set; }

        [Column("test_tag")]
        public string? TestTag { get; set; }

        [Column("test_tag_value")]
        public string? TestTagValue { get; set; }

        [Column("test_tag_value_type")]
        public string? TestTagValueType { get; set; }

        [Column("lower_limit_tag")]
        public string? LowerLimitTag { get; set; }

        [Column("lower_limit_value")]
        public string? LowerLimitValue { get; set; }

        [Column("upper_limit_tag")]
        public string? UpperLimitTag { get; set; }

        [Column("upper_limit_value")]
        public string? UpperLimitValue { get; set; }

        [Column("limit_value_type")]
        public string? LimitValueType { get; set; }

        [Column("nominal_value")]
        public string? NominalValue { get; set; }

        [Column("average_mean")]
        public string? AverageMean { get; set; }

        [Column("lower_limit_mean")]
        public string? LowerLimitMean { get; set; }

        [Column("lower_limit_range")]
        public string? LowerLimitRange { get; set; }

        [Column("upper_limit_mean")]
        public string? UpperLimitMean { get; set; }

        [Column("upper_limit_range")]
        public string? UpperLimitRange { get; set; }

        [Column("standard_deviation")]
        public string? StandardDeviation { get; set; }

        [Column("sample_size")]
        public string? SampleSize { get; set; }
    }
}

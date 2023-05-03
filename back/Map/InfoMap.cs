namespace back.Map
{
    public class InfoMap
    {
        public int? InfoId { get; set; }
        public int? NumberFact { get; set; }
        public string? Fecha { get; set; }
        public string City { get; set; } = null!;
        public string ClienName { get; set; } = null!;
        public string PlateVeh { get; set; } = null!;
        public string Brand { get; set; } = null!;
        public string ActivityName { get; set; } = null!;
        public int Number { get; set; }
        public int Valor { get; set; }
        public int Total { get; set; }
        public int SupplierIdFk { get; set; }
        public string? SupplierNombre { get; set; }
    }

}

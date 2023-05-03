using System;
using System.Collections.Generic;

namespace back.Models;

public partial class ParamSupplier
{
    public int SupplierId { get; set; }

    public string SupplierName { get; set; } = null!;

    public DateTime Created { get; set; }

    public virtual ICollection<InfoFact> InfoFacts { get; set; } = new List<InfoFact>();
}

using back.Models;


namespace back.Services.Cotizacion
{
    public interface ISupplierService
    {
        Task<List<ParamSupplier>> GetList();
    }
}

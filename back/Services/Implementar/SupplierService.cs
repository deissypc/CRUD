using Microsoft.EntityFrameworkCore;
using back.Models;
using back.Services.Cotizacion;

namespace back.Services.Implementar
{
    public class SupplierService : ISupplierService
    {
         private DbfactContext _dbContext;

         public SupplierService(DbfactContext dbContext)
        {
         _dbContext = dbContext;
        }
        public async Task<List<ParamSupplier>> GetList()
        {
            try
            {
                List<ParamSupplier> supplier = new List<ParamSupplier>();
                supplier = await _dbContext.ParamSuppliers.ToListAsync();
                return supplier;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
    }

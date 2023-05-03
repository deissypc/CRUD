using Microsoft.EntityFrameworkCore;
using back.Models;
using back.Services.Cotizacion;

namespace back.Services.Implementar
{
    public class InfoService : IInfoService
    {
        private DbfactContext _dbContext;

        public InfoService(DbfactContext dbContext)
        {
            _dbContext = dbContext;
        }


        public async Task<List<InfoFact>> GetList()
        {
            try
            {
                List<InfoFact> info = new List<InfoFact>();
                info = await _dbContext.InfoFacts.Include(sp => sp.SupplierIdFkNavigation).ToListAsync();
                return info;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<InfoFact> Get(int InfoId)
        {
          try
          {
            InfoFact? busc = new InfoFact();

                busc = await _dbContext.InfoFacts.Include(sp => sp.SupplierIdFkNavigation)
                       .Where(e => e.InfoId == InfoId).FirstAsync();

                return busc;
          }
          catch (Exception ex)
          {
            throw ex;
          }
        }

        public async Task<InfoFact> Add(InfoFact mod)
        {
            try
            {
                _dbContext.InfoFacts.Add(mod);
                await _dbContext.SaveChangesAsync();

                return mod;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public async Task<bool> Update(InfoFact mod)
        {
            try
            {
                _dbContext.InfoFacts.Update(mod);
                await _dbContext.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<bool> Delete(InfoFact mod)
        {
            try
            {
                _dbContext.InfoFacts.Remove(mod);
                await _dbContext.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}

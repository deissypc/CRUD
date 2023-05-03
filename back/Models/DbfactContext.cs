using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace back.Models;

public partial class DbfactContext : DbContext
{
    public DbfactContext()
    {
    }

    public DbfactContext(DbContextOptions<DbfactContext> options)
        : base(options)
    {
    }

    public virtual DbSet<InfoFact> InfoFacts { get; set; }

    public virtual DbSet<ParamSupplier> ParamSuppliers { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {

    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<InfoFact>(entity =>
        {
            entity.HasKey(e => e.InfoId).HasName("PK__Info_Fac__4DEC9D7A5190C967");

            entity.ToTable("Info_Fact");

            entity.Property(e => e.ActivityName)
                .HasMaxLength(35)
                .IsUnicode(false);
            entity.Property(e => e.Brand)
                .HasMaxLength(35)
                .IsUnicode(false);
            entity.Property(e => e.City)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.ClienName)
                .HasMaxLength(35)
                .IsUnicode(false);
            entity.Property(e => e.Created)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Fecha).HasColumnType("datetime");
            entity.Property(e => e.PlateVeh)
                .HasMaxLength(20)
                .IsUnicode(false);

            entity.HasOne(d => d.SupplierIdFkNavigation).WithMany(p => p.InfoFacts)
                .HasForeignKey(d => d.SupplierIdFk)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Info_Fact__Suppl__4CA06362");
        });

        modelBuilder.Entity<ParamSupplier>(entity =>
        {
            entity.HasKey(e => e.SupplierId).HasName("PK__PARAM_Su__4BE666B41059B4EC");

            entity.ToTable("PARAM_Supplier");

            entity.Property(e => e.Created)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.SupplierName)
                .HasMaxLength(35)
                .IsUnicode(false);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}

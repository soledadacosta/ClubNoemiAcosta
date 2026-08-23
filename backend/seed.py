from database import SessionLocal
import models

def poblar_base_de_datos():
    db = SessionLocal()
    try:
        # Si ya existen sedes, limpiamos para reestructurar con el nuevo listado
        if db.query(models.Sede).first():
            print("🧹 Limpiando datos previos de la base de datos...")
            db.query(models.EspacioDeportivo).delete()
            db.query(models.Sede).delete()
            db.commit()

        # 1. SEDE MORÓN
        moron = models.Sede(
            nombre="Club Noemí Acosta - Sede Morón",
            direccion="Av. Rivadavia 18200, Morón",
            telefono="1144556677",
            imagen_url="https://images.unsplash.com/photo-1574629810360-7efbbe195018"
        )
        db.add(moron)
        db.commit()
        db.refresh(moron)

        espacios_moron = [
            models.EspacioDeportivo(sede_id=moron.id, nombre="Cancha de Fútbol 5", deporte="Fútbol", precio_por_hora=16000.00),
            models.EspacioDeportivo(sede_id=moron.id, nombre="Cancha de Fútbol 7", deporte="Fútbol", precio_por_hora=22000.00),
            models.EspacioDeportivo(sede_id=moron.id, nombre="Cancha de Fútbol 11", deporte="Fútbol", precio_por_hora=35000.00),
            models.EspacioDeportivo(sede_id=moron.id, nombre="Cancha de Tenis (Polvo de Ladrillo)", deporte="Tenis", precio_por_hora=12000.00),
            models.EspacioDeportivo(sede_id=moron.id, nombre="Cancha de Tenis (Cemento)", deporte="Tenis", precio_por_hora=10000.00),
        ]
        db.add_all(espacios_moron)

        # 2. SEDE RAMOS MEJÍA
        ramos = models.Sede(
            nombre="Club Noemí Acosta - Sede Ramos Mejía",
            direccion="Av. de Mayo 950, Ramos Mejía",
            telefono="1133221100",
            imagen_url="https://images.unsplash.com/photo-1529900748604-07564a03e7a6"
        )
        db.add(ramos)
        db.commit()
        db.refresh(ramos)

        espacios_ramos = [
            models.EspacioDeportivo(sede_id=ramos.id, nombre="Cancha de Fútbol 5", deporte="Fútbol", precio_por_hora=16000.00),
            models.EspacioDeportivo(sede_id=ramos.id, nombre="Cancha de Fútbol 11", deporte="Fútbol", precio_por_hora=35000.00),
            models.EspacioDeportivo(sede_id=ramos.id, nombre="Cancha de Hockey", deporte="Hockey", precio_por_hora=25000.00),
            models.EspacioDeportivo(sede_id=ramos.id, nombre="Cancha de Vóley", deporte="Vóley", precio_por_hora=11000.00),
        ]
        db.add_all(espacios_ramos)

        # 3. SEDE SAN JUSTO
        san_justo = models.Sede(
            nombre="Club Noemí Acosta - Sede San Justo",
            direccion="Florencio Varela 1900, San Justo",
            telefono="1166778899",
            imagen_url="https://images.unsplash.com/photo-1535131749006-b7f58c99034b"
        )
        db.add(san_justo)
        db.commit()
        db.refresh(san_justo)

        espacios_san_justo = [
            models.EspacioDeportivo(sede_id=san_justo.id, nombre="Cancha de Fútbol 5", deporte="Fútbol", precio_por_hora=16000.00),
            models.EspacioDeportivo(sede_id=san_justo.id, nombre="Cancha de Fútbol 8", deporte="Fútbol", precio_por_hora=26000.00),
            models.EspacioDeportivo(sede_id=san_justo.id, nombre="Cancha de Tenis", deporte="Tenis", precio_por_hora=12000.00),
            models.EspacioDeportivo(sede_id=san_justo.id, nombre="Golf - Driving Range", deporte="Golf", precio_por_hora=15000.00),
            models.EspacioDeportivo(sede_id=san_justo.id, nombre="Golf - Campo 9 Hoyos", deporte="Golf", precio_por_hora=30000.00),
        ]
        db.add_all(espacios_san_justo)

        # 4. SEDE CASTELAR
        castelar = models.Sede(
            nombre="Club Noemí Acosta - Sede Castelar",
            direccion="Carlos Casares 850, Castelar",
            telefono="1188990011",
            imagen_url="https://images.unsplash.com/photo-1626248801379-51a0748a5f96"
        )
        db.add(castelar)
        db.commit()
        db.refresh(castelar)

        espacios_castelar = [
            models.EspacioDeportivo(sede_id=castelar.id, nombre="Cancha de Tenis (Polvo de Ladrillo)", deporte="Tenis", precio_por_hora=12000.00),
            models.EspacioDeportivo(sede_id=castelar.id, nombre="Cancha de Tenis (Cemento)", deporte="Tenis", precio_por_hora=10000.00),
            models.EspacioDeportivo(sede_id=castelar.id, nombre="Cancha de Vóley Playa (Arena)", deporte="Vóley", precio_por_hora=13000.00),
            models.EspacioDeportivo(sede_id=castelar.id, nombre="Cancha de Vóley Indoor (Parquet)", deporte="Vóley", precio_por_hora=15000.00),
            models.EspacioDeportivo(sede_id=castelar.id, nombre="Cancha de Hockey", deporte="Hockey", precio_por_hora=25000.00),
        ]
        db.add_all(espacios_castelar)

        db.commit()
        print("✅ Base de datos poblada exitosamente con las 4 sedes y sus espacios deportivos.")

    except Exception as e:
        print(f"❌ Error al poblar la base de datos: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    poblar_base_de_datos()
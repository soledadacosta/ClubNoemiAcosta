from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional  # <--- Aquí agregamos Optional
from uuid import UUID

import models
import schemas
from database import engine, get_db

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="API Club Noemí Acosta")
from fastapi.middleware.cors import CORSMiddleware

# Habilitar CORS para que React pueda hacer peticiones
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"mensaje": "Bienvenido a la API del Club Noemí Acosta"}

# --- RUTAS DE SEDES ---
@app.get("/sedes", response_model=List[schemas.SedeResponse])
def obtener_sedes(db: Session = Depends(get_db)):
    return db.query(models.Sede).all()

@app.post("/sedes", response_model=schemas.SedeResponse, status_code=status.HTTP_201_CREATED)
def crear_sede(sede: schemas.SedeCreate, db: Session = Depends(get_db)):
    nueva_sede = models.Sede(**sede.model_dump())
    db.add(nueva_sede)
    db.commit()
    db.refresh(nueva_sede)
    return nueva_sede

# --- RUTAS DE ESPACIOS DEPORTIVOS ---
@app.get("/espacios", response_model=List[schemas.EspacioResponse])
def obtener_espacios(sede_id: Optional[UUID] = None, db: Session = Depends(get_db)):
    query = db.query(models.EspacioDeportivo)
    if sede_id:
        query = query.filter(models.EspacioDeportivo.sede_id == sede_id)
    return query.all()

@app.post("/espacios", response_model=schemas.EspacioResponse, status_code=status.HTTP_201_CREATED)
def crear_espacio(espacio: schemas.EspacioCreate, db: Session = Depends(get_db)):
    nuevo_espacio = models.EspacioDeportivo(**espacio.model_dump())
    db.add(nuevo_espacio)
    db.commit()
    db.refresh(nuevo_espacio)
    return nuevo_espacio

# --- RUTAS DE RESERVAS ---
@app.get("/reservas", response_model=List[schemas.ReservaResponse])
def obtener_reservas(db: Session = Depends(get_db)):
    return db.query(models.Reserva).all()

@app.post("/reservas", response_model=schemas.ReservaResponse, status_code=status.HTTP_201_CREATED)
def crear_reserva(reserva: schemas.ReservaCreate, db: Session = Depends(get_db)):
    nueva_reserva = models.Reserva(**reserva.model_dump())
    db.add(nueva_reserva)
    db.commit()
    db.refresh(nueva_reserva)
    return nueva_reserva
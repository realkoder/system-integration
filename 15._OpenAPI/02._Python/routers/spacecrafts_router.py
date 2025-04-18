from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter();


class Spacecraft(BaseModel):
    id: int
    name: str

class SpacecraftRequestModel(BaseModel):
    name: str


spacecrafts = [
    Spacecraft(id=1, name="Apollo 13"),
    Spacecraft(id=2, name="Challenger"),
    Spacecraft(id=3, name="Enterprise")
]

@router.get("/api/spacecrafts", tags=["spacecraft"], response_model=list[Spacecraft])
async def get_spacecrafts():
    return spacecrafts

@router.get("/api/spacecrafts/{spacecraft_id}", tags=["spacecraft"], response_model=Spacecraft)
def get_spacecraft_by_id(spacecraft_id):
    for spacecraft in spacecrafts:
        if spacecraft.id == spacecraft_id:
            return spacecraft
    raise HTTPException(status_code=404, detail="Spacecraft not found")

@router.post("/api/spacecrafts", tags=["Spacecraft"], response_model=Spacecraft)
def create_spacecraft(spacecraft_request: SpacecraftRequestModel):
    new_spacecraft = Spacecraft(id=len(spacecrafts) + 1, name=spacecraft_request.name)
    spacecrafts.append(new_spacecraft)
    return new_spacecraft

"""This module provides a FastAPI web server that shows current time in Moscow (MSK)"""

from datetime import datetime
import datetime as dt

from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
import uvicorn
import os

def get_application() -> FastAPI:
    return FastAPI(title=__name__)


offset = dt.timedelta(hours=3)
tz = dt.timezone(offset, name="MSK")

app = get_application()


# prepare visits file

data_path = os.getenv('DATA_PATH')

visits_data = f"{data_path}/visits/count"

from pathlib import Path
#creating a new directory called pythondirectory
Path(visits_data).parent.mkdir(parents=True, exist_ok=True)

with open(visits_data, "w", encoding="utf8") as visits:
    visits.write("0")




def get_datetime() -> str:
    """get current time as a formatted string

    Returns:
       str : formatted time
    """
    return str(datetime.now(tz=tz).strftime("%H:%M:%S"))


templates = Jinja2Templates(directory="app/templates")


@app.get("/", response_class=HTMLResponse)
async def root(request: Request):
    """GET / to show current MSK time

    Args:
        request (Request): dummy request

    Returns:
       Any : some template HTML response
    """
    n_visits = None
    with open(visits_data, "r", encoding="utf8") as visits:
        n_visits = int(visits.read())
    with open(visits_data, "w", encoding="utf8") as visits:
        visits.write(str(n_visits + 1))
    return templates.TemplateResponse(
        "index.jinja", {"request": request, "time_msk": get_datetime()}
    )


@app.get("/visits", response_class=HTMLResponse)
async def visits_page(request: Request):
    """GET /visits to show # site visits

    Args:
        request (Request): dummy request

    Returns:
       Any : some template HTML response
    """
    n_visits = None
    with open(visits_data, "r", encoding="utf8") as visits:
        n_visits = int(visits.read())
    return templates.TemplateResponse(
        "visits.jinja", {"request": request, "n_visits": n_visits}
    )


def main():
    uvicorn.run(app, host=os.environ["HOST"], port=int(os.environ["PORT"]))


if __name__ == "__main__":
    main()

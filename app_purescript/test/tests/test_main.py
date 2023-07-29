import pytest
from selenium.webdriver.common.by import By
from selenium.webdriver.firefox.webdriver import WebDriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.firefox.options import Options
import os
import requests
import time

# https://pytest-selenium.readthedocs.io/en/latest/user_guide.html#configuration
@pytest.fixture
def firefox_options(firefox_options: Options):
    firefox_options.add_argument("--headless")
    return firefox_options


def wait_for_server(server_address):
    status = True

    while status:
        if status:
            # check the the status and assign to offense_response.status_code
            try:
                res = requests.get(server_address)
                if res: 
                    break
            except:
                print("no response")
            finally:
                print("the server isn't yet ready")
                time.sleep(2)
        else:
            print("Server is alive!")
            status = False


# https://pytest-selenium.readthedocs.io/en/latest/user_guide.html#nondestructive-tests
@pytest.mark.nondestructive
def test_get_root(driver: WebDriver):
    host = os.getenv("HOST")
    port = os.getenv("PORT")

    server_address = f"http://{host}:{port}"
    wait_for_server(server_address=server_address)

    driver.get(server_address)
    elem = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "time"))
    )
    assert bool(elem)

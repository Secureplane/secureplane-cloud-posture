import pytest
from src.infrastructure.terraform_manager import TerraformManager
from src.utils.config import load_config

@pytest.fixture
def tf_manager():
    config = load_config('dev')
    return TerraformManager('dev', config)

def test_validate_success(tf_manager, mocker):
    mocker.patch.object(tf_manager.tf, 'init', return_value=(0, '', ''))
    mocker.patch.object(tf_manager.tf, 'validate', return_value=(0, '', ''))
    assert tf_manager.validate() is None

def test_plan_success(tf_manager, mocker):
    mocker.patch.object(tf_manager.tf, 'init', return_value=(0, '', ''))
    mocker.patch.object(tf_manager.tf, 'plan', return_value=(0, '', ''))
    assert tf_manager.plan() is None

def test_security_scan_success(tf_manager, mocker):
    mocker.patch('os.system', return_value=0)
    assert tf_manager.security_scan() is None
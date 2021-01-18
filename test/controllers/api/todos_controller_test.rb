require 'test_helper'

class Api::TodosControllerTest < ActionDispatch::IntegrationTest
  test "should get switch_user" do
    put api_todos_switch_user_url
    assert_response :success
  end

end

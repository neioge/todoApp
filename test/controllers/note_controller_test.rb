require 'test_helper'

class NoteControllerTest < ActionDispatch::IntegrationTest
  test "should get main" do
    get note_main_url
    assert_response :success
  end

end

require 'test_helper'

class Api::ContactsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_contacts_index_url
    assert_response :success
  end

  test "should get update" do
    get api_contacts_update_url
    assert_response :success
  end

end

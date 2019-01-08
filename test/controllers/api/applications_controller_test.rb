require 'test_helper'

class Api::ApplicationsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_applications_index_url
    assert_response :success
  end

  test "should get update" do
    get api_applications_update_url
    assert_response :success
  end

  test "should get show" do
    get api_applications_show_url
    assert_response :success
  end

  test "should get delete" do
    get api_applications_delete_url
    assert_response :success
  end

end

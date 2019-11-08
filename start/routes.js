'use strict';

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.get('/', 'HomeController.home').as('home');
Route.on('/welcome').render('layouts.welcome');

Route.get('/switch/:lang', 'HomeController.changeLang');

//= ========================================================================
// Auth
//= ========================================================================
// User Authentication
Route.get('/register', 'UserController.registerUserRender').as('registerUser');
Route.post('/register', 'UserController.create').validator('CreateUser');

// Admin Authentication
Route.get('/admin/register', 'UserController.registerAdminRender').as('registerAdmin');
Route.post('/admin/register', 'UserController.createAdmin').as('CreateAdmin').validator('CreateAdmin');

// Logout
Route.get('/login', 'UserController.loginRender').as('login');
Route.post('/login', 'UserController.login').validator('LoginUser');
Route.get('/logout', 'UserController.logout').as('logout');

// Forgot password
Route.get('/forgotPassword', 'UserController.forgotPasswordRender').as('forgotPassword');
Route.post('/resetPassword', 'UserController.resetPassword').as('resetPassword').validator('ResetPassword');
Route.get('/newPassword', 'UserController.verifyHash');
Route.get('/newUser', 'UserController.verifyEmail');
Route.post('/createPasswordResetRequest', 'UserController.createPasswordResetRequest').as('createPasswordResetRequest');

// user details
Route.get('/user/:id', 'UserController.show').as('viewProfile').middleware(['auth']);
Route.get('/allUsers', 'UserController.getAllUsers').as('allUsers').middleware(['isAdmin']);
Route.get('/allAdmins', 'UserController.getAllAdmins').as('allAdmins').middleware(['isAdmin']);
Route.get('/user/:id/edit', 'UserController.edit').as('editUser').middleware(['auth']);
Route.post('/user/:id/edit', 'UserController.update').as('saveUser').validator('EditUser').middleware(['auth']);
Route.post('/user/:id/editAdmin', 'UserController.update').as('saveAdmin').validator('EditAdmin').middleware(['isAdmin']);
Route.post('/user/updatepassword', 'UserController.changePassword').as('changePassword').middleware(['auth']).validator('ResetPassword');
Route.post('/user/:id/delete', 'UserController.delete').as('deleteProfile').validator('DeleteProfile').middleware(['auth']);

//= ========================================================================
//  Configuration of buildings
//= ========================================================================
Route.get('/building/select', 'BuildingController.viewSelectBuilding').as('viewSelectBuilding').middleware(['auth']);
Route.get('/building/:id/edit', 'BuildingController.editBuilding').as('editBuilding').middleware(['isAdmin']);
Route.post('/building/:id/edit', 'BuildingController.updateBuilding').as('updateBuilding').validator('EditBuilding').middleware(['isAdmin']);
Route.get('/building/set/:id', 'BuildingController.setBuilding').as('setBuilding').middleware(['auth']);
Route.get('/building/configure', 'BuildingController.show').as('configuration').middleware(['isAdmin']);

Route.post('/tower/add', 'TowerController.addTower').as('addTower').validator('AddEditTower').middleware(['isAdmin']);
Route.post('/tower/:id/edit', 'TowerController.updateTower').as('updateTower').validator('AddEditTower').middleware(['isAdmin']);
Route.post('/tower/:id/delete', 'TowerController.deleteTower').as('deleteTower').middleware(['isAdmin']);

Route.post('/floor/add', 'FloorController.addFloor').as('addFloor').validator('AddEditFloor').middleware(['isAdmin']);
Route.post('/floor/:id/edit', 'FloorController.updateFloor').as('updateFloor').validator('AddEditFloor').middleware(['isAdmin']);
Route.post('/floor/:id/delete', 'FloorController.deleteFloor').as('deleteFloor').middleware(['isAdmin']);

Route.post('/feature/add', 'FeatureController.addRoomFeature').as('addRoomFeature').validator('AddFeature').middleware(['isAdmin']);
Route.post('/feature/:id/edit', 'FeatureController.updateRoomFeature').as('updateRoomFeature').validator('EditFeature').middleware(['isAdmin']);
Route.post('/feature/:id/delete', 'FeatureController.deleteRoomFeature').as('deleteRoomFeature').middleware(['isAdmin']);

Route.get('/addRoom', 'RoomController.create').as('addRoomForm').middleware(['isAdmin']);
Route.post('/addRoom', 'RoomController.add').as('addRoom').validator('AddRoom').middleware(['isAdmin']);
Route.get('/adminDash', 'HomeController.adminDashboard').as('adminDash').middleware(['isAdmin']);

//= ========================================================================
//  Rooms
//= ========================================================================
Route.get('/rooms/:id', 'RoomController.show').as('showRoom').middleware(['auth']);
Route.get('/rooms/:id/edit', 'RoomController.edit').as('editRoom').middleware(['isAdmin']);
Route.post('/rooms/:id/edit', 'RoomController.update').as('saveRoom').validator('EditRoom').middleware(['isAdmin']);
Route.get('/rooms', 'RoomController.getAllRooms').as('allRooms').middleware(['auth']);

// Issues
Route.get('/room/:roomID/issues/:issueStatus/:timeFilter', 'IssueController.getRoomIssues').as('showIssue').middleware(['isAdmin']);
Route.get('/issue/:id/edit', 'IssueController.editIssue').as('editIssue').middleware(['isAdmin']);
Route.post('/issue/:id/edit', 'IssueController.updateIssue').as('updateIssue').middleware(['isAdmin']).validator('EditIssue');
Route.post('/reportRoom', 'IssueController.submit').as('reportRoom').middleware(['isUser']).validator('ReportRoom');

// Reviews
Route.post('/addReview/:id', 'ReviewController.add').as('addReview').validator('AddReview').middleware(['isUser']);
Route.post('/editReview/:id', 'ReviewController.edit').as('editReview').validator('AddReview').middleware(['isUser']);
Route.post('/deleteReview/:id', 'ReviewController.delete').as('deleteReview').middleware(['auth']);

//= ========================================================================
// Bookings
//= ========================================================================
Route.post('/goToDetails', 'RoomController.goToDetails').as('goToDetails').middleware(['auth']); // needs to be changed to get
Route.get('/:bookingType/:id/bookings/:catFilter/:limitFilter', 'BookingController.viewBookings').as('viewBookings').middleware(['auth']);
Route.post('/:bookingType/cancelBooking/:id', 'BookingController.cancelBooking').as('cancelBooking').middleware(['auth']);

// Employee user pages
Route.get('/searchRooms/:view', 'RoomController.loadSearchRoomsForm').as('searchRooms').middleware(['isUser']);
Route.get('/userDash', 'HomeController.userDashboard').as('userDash').middleware(['isUser']);

// Rendering Results
Route.get('/results', 'RoomController.findSpecific').as('results').middleware(['auth']).validator('SearchRoom').middleware(['isUser']);
Route.get('/search/fixed', 'RoomController.fixedSearchRooms').as('searchFixed').validator('SearchFixed');
Route.get('/search/flexible', 'RoomController.flexibleSearchRooms').as('searchFlexible').validator('SearchFlexible');
Route.get('/search/recurring', 'RoomController.searchRooms').as('searchRecurring').validator('SearchRoomFlexible'); // TODO

// Booking a Room
Route.post('/confirmBooking', 'BookingController.confirmBooking').as('confirmBooking').validator('BookRoom').middleware(['isUser']);

// Outlook
Route.get('/test-connection', 'HomeController.testAgentConnection').as('testAgentConnection');
Route.get('/authenticate', 'TokenController.getAuthUrl');
Route.get('/authorize', 'TokenController.authorize');
Route.get('/event', 'BookingController.createEvent');
Route.get('/calendars', 'RoomController.getCalendars');
Route.get('/calendar', 'RoomController.getCalendar');

//= ========================================================================
// Recurring
//= ========================================================================
Route.get('/recurring', 'RecurController.renderRecurring').as('recurring');
Route.get('/recurringResults', 'RecurController.searchRecurring').as('recurringResults');

//= ========================================================================
// Chatbot
//= ========================================================================
Route.post('/message', 'Roomcontroller.sendMessage').as('message');

//= ========================================================================
// Pusher
//= ========================================================================
Route.get('/push', 'TokenController.push').as('push');

//= ========================================================================
// Active Directory
//= ========================================================================
Route.post('/active', 'UserController.active').as('active');

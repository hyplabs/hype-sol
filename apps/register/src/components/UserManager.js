/**
 * Centralize User & Data Operations
 */
 
let userManager = undefined;
function UserManager() {
    if (userManager)
        return userManager;
    
    let self = {};
    self.users = [];
    self.currentUser = null;
    self.cookies = undefined;
    self.findUser = (username) =>{
        // TODO -- this is where you do user DB or W3 lookup
        // TODO -- validation
        if (self.cookies != undefined && self.cookies['user_'+username] != undefined)
            return self.cookies['user_'+username];
        return undefined;
    }

    self.setupCookies = (cookieObject) =>{
        [self.cookies,self.setCookie,self.removeCookie] = cookieObject;
    }      
    self.loginUser  = (userData) =>{
        // TODO -- check password and do other user stuff
        let user = self.findUser(userData.userName);
        if (user)
        {
            self.setCookie('current_user', user);
            return true;
        }
        return false;
    }
    self.registerUser = (userData) =>{
        //TODO -- some kind of User publish work here.
        // TODO -- validation
        userData.object_id = "object_id_1000";
        if (self.findUser(userData.userName))
            return false; 
        self.currentUser = userData;
        self.setCookie('current_user', self.currentUser);
        self.setCookie('user_'+userData.userName, self.currentUser);
        return true;
    }

    self.setUser = (userData) =>{
        // TODO -- do some DB work to select current user
        // TODO -- validation
        userData.object_id = "object_id_1000";
        self.currentUser = userData;
        self.setCookie('current_user', self.currentUser);
        return true;
    }
    self.getCurrentUser = () =>{
        if (self.currentUser == null && self.cookies != undefined && self.cookies['current_user'] != undefined)
            self.currentUser = self.cookies['current_user'];

        return self.currentUser;
    }
    self.logoutUser = () =>{
        if (self.cookies != undefined && self.cookies['current_user'] != undefined)
            self.removeCookie('current_user');
        self.currentUser = null;
    }

    userManager = self;
    return userManager;
}

export default UserManager;




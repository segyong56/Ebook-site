import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";

// pages for AUTH
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import ResetPassword from './views/ResetPassword/ResetPassword.js'

import UserProfilePage from "./views/UserProfilePage/UserProfilePage.js";

//PAGES FOR BOOKS
import LandingPage from "./views/LandingPage/LandingPage.js";
import BookCoverPage from "./views/BookCoverPage/BookCoverPage.js"
import BookContentPage from "./views/BookContentPage/BookContentPage.js"
import SearchPage from './views/SearchPage/SearchPage.js'
import CategoryPage from './views/CategoryPage/CategoryPage.js'

//PAGES FOR BOOK UPLOAD/EDIT/DELETE
import BookUploadPage from "./views/BookUploadPage/BookUploadPage.js"
import BookChapterPage from "./views/BookChapterPage/BookChapterPage.js"
import BookCoverEditPage from './views/BookCoverEditPage/BookCoverEditPage.js'
import ContentUploadPage from "./views/ContentUploadPage/ContentUploadPage.js"
import ContentEditPage from './views/ContentEditPage/ContentEditPage.js'

//PAGES FOR MYPAGE
import MyPagePage from './views/MyPagePage/MyPagePage.js'
import MyProfileEditPage from './views/MyProfileEditPage/MyProfileEditPage'
import MyBookListPage from "./views/MyBookListPage/MyBookListPage.js"
import MyReadingListPage from "./views/MyReadingListpage/MyReadingListPage.js"

//NAV, FOOTER
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer"

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>

          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/forgot_password" component={Auth(ResetPassword, false)} />

          <Route exact path="/users/userpage/:userId" component={Auth(UserProfilePage, null)} />

          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/book/:bookId" component={Auth(BookCoverPage, null)} />
          <Route exact path="/search" component={Auth(SearchPage, null)} />
          <Route exact path="/search/:categoryKey" component={Auth(CategoryPage, null)} />

          <Route exact path="/upload" component={Auth(BookUploadPage, null)} />
          <Route exact path="/book/bookChapter/:bookId" component={Auth(BookChapterPage, null)} />
          <Route exact path="/book/bookChapter/:bookId/edit" component={Auth(BookCoverEditPage, null)} />

          <Route exact path="/book/:bookId/content/upload" component={Auth(ContentUploadPage, null)} />
          <Route exact path="/book/:bookId/content/edit/:chapter" component={Auth(ContentEditPage, null)} />
          <Route exact path="/book/:bookId/content/:chapter" component={Auth(BookContentPage, null)} />
          
          <Route exact path="/me/mypage" component={Auth(MyPagePage, null)} />
          <Route exact path="/me/mypage/edit" component={Auth(MyProfileEditPage, null)} />
          <Route exact path="/me/myBook_list" component={Auth(MyBookListPage, null)} />
          <Route exact path="/me/myReading_list" component={Auth(MyReadingListPage, null)} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}
export default App;

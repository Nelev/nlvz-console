import React from "react";
import { connect } from "react-redux";
import { history } from "react-router-prop-types";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import DashBoard from "../DashBoard/index.jsx";
import { resources } from "../../common/commons.js";
import Header from "../../components/Header/index.jsx";
import Profile from "../../components/Profile/index.jsx";
import SideMenu from "../../components/SideMenu/index.jsx";

import { logout } from "../../common/Login/actions.js";
import { menuSizes } from "../../common/commons.js";
import "./style.less";

class Root extends React.Component {
    static propTypes = {
        history: history.isRequired,
        logout: PropTypes.func.isRequired,
        user: PropTypes.string
    };

    state = {
        showMenu: false,
        currentResource: "Dashboard",
        showProfile: false
    };

    handleMenuClick = key => {
        this.setState({ currentResource: resources[key].name });
    };

    handleMenuToggle = () => {
        this.setState({ showMenu: !this.state.showMenu });
    };

    handleProfileOpen = () => {
        this.setState({ showProfile: !this.state.showProfile });
    };

    renderProfile() {
        return this.state.showProfile === true ? (
            <Profile
                visible={this.state.showProfile}
                handleProfileOpen={this.handleProfileOpen}
            />
        ) : null;
    }

    renderSliderMenu() {
        return this.state.showMenu === true ? (
            <SideMenu
                show={this.state.showMenu}
                size={menuSizes.extended}
                handleMenuClick={this.handleMenuClick}
            />
        ) : (
            <SideMenu
                show={this.state.showMenu}
                size={menuSizes.small}
                handleMenuClick={this.handleMenuClick}
            />
        );
    }

    renderWorkAreaContent() {
        return <div className="v-Workarea-Content" />;
    }

    render() {
        const { user, logout } = this.props;
        return (
            <div className="v-Root">
                <Header
                    handleMenuToggle={this.handleMenuToggle}
                    handleProfileOpen={this.handleProfileOpen}
                    showMenu={this.state.showMenu}
                    user={user}
                    logout={logout}
                    resource={this.state.currentResource}
                />
                <div className="v-Workarea">
                    {this.renderSliderMenu()}
                    {this.renderWorkAreaContent()}
                    {this.renderProfile()}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.login.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        logout: bindActionCreators(logout, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Root);

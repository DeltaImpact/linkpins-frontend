import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../actions';
import './../styles/ProfilePage.css';

function NumberList(props) {
    const values = props.values;
    var listItems = Object.keys(values).map(function (value, index) {
        return <li key={index}>
            {value} : {values[value]}
        </li>

    })

    return (
        <ul className="user-list">
            {listItems}
        </ul>
    );
}

class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        const { dispatch } = this.props;
        // this.handleLogout = this.handleLogout.bind(this);

    }

    componentDidMount() {
        this.props.dispatch(userActions.data_about_user());

    }

    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }



    render() {
        const { data } = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Profile info</h2>
                {data.loading && <em>Loading profile...</em>}
                {data.error && <span className="text-danger">ERROR: {data.error}</span>}
                {data.userProfile &&
                    <NumberList values={data.userProfile} />
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { data } = state;
    // debugger
    return {
        data
    };
}

const connectedProfilePage = connect(mapStateToProps)(ProfilePage);
export { connectedProfilePage as ProfilePage };
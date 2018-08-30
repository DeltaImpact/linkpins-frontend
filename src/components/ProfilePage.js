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
    componentDidMount() {
        this.props.dispatch(userActions.data_about_user());
    }

    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }



    render() {
        const { user, users } = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Profile info</h2>
                {users.loading && <em>Loading profile...</em>}
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                {users.items &&
                    // <NumberList values={users.items} />
                    <NumberList values={users.items} />
                    // <div>
                    //     {JSON.stringify(users.items)}
                    //     {/* { users.items.map(station => <div> {station} </div>) } */}
                    // </div>
                }

            </div>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedProfilePage = connect(mapStateToProps)(ProfilePage);
export { connectedProfilePage as ProfilePage };
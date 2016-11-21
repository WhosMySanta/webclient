/* @flow */

import React, {Component} from 'react';
import Relay, {Mutation, Store} from 'react-relay';

import TextField from '../TextField';


type Props = {
  app: {},
};

type Event = {
  target: {
    value: string,
  },
};

type Friend = {
  id: number,
  name: string,
  email: string,
};

type State = {
  id: string,
  title: string,
  description: string,
  friends: Array<Friend>,
};

export type HandleChangeEvent = (event: Event) => void;
type HandleChangeFn = (property: string) => HandleChangeEvent;
type HandleChangeFriendFn = (params: {property: string, id: number}) => HandleChangeEvent;

class CreateGroupMutation extends Mutation {
  static fragments = {
    app: () => Relay.QL`
      fragment on App {
        id,
      },
    `,
  }
  getMutation() {
    return Relay.QL`
      mutation { createGroup },
    `;
  }
  getVariables() {
    const {id, title, description, friends} = this.props.group;

    return {
      id,
      title,
      description,
      friends,
    };
  }
  getFatQuery() {
    return Relay.QL`
      fragment on CreateGroupPayload {
        app {
          groups,
        }
      },
    `;
  }
  getConfigs() {
    return [
      {
        type: 'FIELDS_CHANGE',
        fieldIDs: {app: this.props.app.id},
      },
    ];
  }
}

class Create extends Component {
  state: State = {
    id: 'someRandomId',
    title: '',
    description: '',
    friends: [
      {id: 0, name: '', email: ''},
      {id: 1, name: '', email: ''},
      {id: 2, name: '', email: ''},
    ],
  }

  props: Props

  addFriend() {
    this.setState({friends: [
      ...this.state.friends,
      {
        id: this.state.friends.length,
        name: '',
        email: '',
      },
    ]});
  }

  handleChange: HandleChangeFn = (property: string) => ({target: {value}}) => {
    this.setState({[property]: value});
  }

  handleChangeFriend: HandleChangeFriendFn = ({property, id}) => ({target: {value}}) => {
    const friends = this.state.friends
      .map((friend) =>
        friend.id !== id ?
          friend :
          ({
            ...friend,
            [property]: value,
          }),
      );
    this.setState({friends});
  }

  handleSubmit = () => {
    const {app} = this.props;
    const {id, title, description, friends} = this.state;

    Store.commitUpdate(
      new CreateGroupMutation({
        app,
        group: {
          id,
          title,
          description,
          friends,
        },
      }),
    );
  }

  render() {
    const {
      handleChange,
      handleChangeFriend,
      handleSubmit,
    } = this;

    const {
      title,
      description,
      friends,
    } = this.state;

    return (
      <main>
        <h1>Create</h1>
        <hr />
        <section>
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={handleChange('title')}
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={handleChange('description')}
            />
          </div>
        </section>
        <section>
          <h3>Friends</h3>
          {friends.map(({id, name, email}) => (
            <div key={id}>
              <TextField
                id={`friend-name-${id}`}
                label="Name"
                value={name}
                onChange={handleChangeFriend({property: 'name', id})}
              />
              <TextField
                id={`friend-email-${id}`}
                label="Email"
                value={email}
                onChange={handleChangeFriend({property: 'email', id})}
              />
              <hr />
            </div>
          ))}
        </section>
        <button type="button" onClick={handleSubmit}>Send</button>
      </main>
    );
  }
}


export default Relay.createContainer(Create, {
  fragments: {
    app: () => Relay.QL`
      fragment on App {
        groups,
        ${CreateGroupMutation.getFragment('app')},
      }
    `,
  },
});

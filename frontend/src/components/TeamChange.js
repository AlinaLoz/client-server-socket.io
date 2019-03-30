import React, {Component} from 'react';
import {connect} from "react-redux";
import {
  dropMessage,
  emitGetOneTeam, emitUpdateNameTeam,
  subscribeGetOneTeam, subscribeUpdateNameTeam,
  updateName
} from "../redux/teams/actions";
import {Button, Grid, Header, Input, List, Message} from "semantic-ui-react";

class TeamChange extends Component {
  state = {
      name: ''
  };

  componentWillMount() {
      const {onSubscribeGetOneTeam, onSubscribeUpdateNameTeam} = this.props;
      onSubscribeGetOneTeam();
      onSubscribeUpdateNameTeam();
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const {team} = nextProps;
    if (team !== this.props.team) {
      this.setState({name:team.name});
    }
  }

  componentDidMount() {
    const {onEmitGetOneTeam, match} = this.props;
    onEmitGetOneTeam(match.params.id);
  }

  render() {
        const {ondropMessage, onEmitUpdateNameTeam} = this.props;
        const {message, team} = this.props;
        return (
            <Grid className={`team-change`}>
                <Message hidden={!Object.keys(message).length} onDismiss={ondropMessage}>
                    <Message.Header>{message.info}</Message.Header>
                </Message>
                <Header>{team && team.name}</Header>
                <label>изменить название тимы</label>
                <Input value={this.state.name} onChange={(e) => this.setState({name:e.target.value})}/>
                <Header>Участники:</Header>
                <List>
                    {team && team.users.map((user, index) => <List.Item key={index}>{user.login}</List.Item>)}
                </List>
                <Button className={`button-save`} onClick={() => onEmitUpdateNameTeam(team.id, this.state.name)}>Сохранить</Button>
            </Grid>
        )
    }
}

export default connect(
    (state, props) => ({
        team     : state.teams.infoTeams[props.match.params.id],
        message  : state.teams.messageOfCreate,
    }),
    dispatch => ({
        onSubscribeGetOneTeam: () => dispatch(subscribeGetOneTeam()),
        onEmitGetOneTeam: (id) => dispatch(emitGetOneTeam(id)),
        ondropMessage: () => dispatch(dropMessage()),
        onSubscribeUpdateNameTeam: () => dispatch(subscribeUpdateNameTeam()),
        onEmitUpdateNameTeam: (id, name) => dispatch(emitUpdateNameTeam(id, name)),
    })
)(TeamChange);
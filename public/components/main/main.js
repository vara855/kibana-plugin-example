import React from 'react';
import {
  EuiPage,
  EuiPageHeader,
  EuiTitle,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentHeader,
  EuiPageContentBody,
  EuiText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFieldText,
  EuiButton,
  EuiSpacer
} from '@elastic/eui';
import { toastNotifications } from 'ui/notify';
export class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entity: {
      },
      loadId: '',
      entities: []
    };
    console.log(this.props);
  }

  componentDidMount() {
    /*
       FOR EXAMPLE PURPOSES ONLY.  There are much better ways to
       manage state and update your UI than this.
    */
    const { httpClient, savedEntityService } = this.props;
    savedEntityService.get()
      .then(entity => {
        this.setState({
          entity
        });
      });
    httpClient.get('../api/my-plugin/example').then((resp) => {
      this.setState({ time: resp.data.time });
    });
  }
  onChange = (value, field) => {
    const newEntity = Object.assign(this.state.entity, { [field]: value });
    this.setState({
      entity: newEntity
    });
  }

  load = async (id = '') => {
    const { savedEntityService } = this.props;
    const entity = await savedEntityService.get(id);
    this.setState({
      entity
    });
  }

  save = async () => {
    try {
      const id = await this.state.entity.save();
      toastNotifications.addSuccess({
        title: `Saved ${id}`
      });
      const { entity } = this.state;
      this.setState({
        entity: entity
      });
    } catch (e) {
      toastNotifications.addDanger({
        title: 'Error',
        text: JSON.stringify(e)
      });
    }
  }

  findAll = async () => {
    try {
      const { savedEntityService } = this.props;
      const entities = await savedEntityService.findAll();
      this.setState({
        entities: entities
      });
    } catch (e) {
      toastNotifications.addDanger({
        title: 'Error',
        text: JSON.stringify(e)
      });
    }
  }
  render() {
    const { title } = this.props;
    return (
      <EuiPage>
        <EuiPageBody>
          <EuiPageHeader>
            <EuiTitle size="l">
              <h1>{title} Hello World!</h1>
            </EuiTitle>
          </EuiPageHeader>
          <EuiPageContent>
            <EuiPageContentHeader>
              <EuiTitle>
                <h2>Congratulations</h2>
              </EuiTitle>
            </EuiPageContentHeader>
            <EuiPageContentBody>
              <EuiText>
                <h3>You have successfully created your first Kibana Plugin!</h3>
                <p>The server time (via API call) is {this.state.time || 'NO API CALL YET'}</p>
              </EuiText>
              <EuiSpacer/>
              <EuiFlexGroup style={{ maxWidth: 500 }}>
                <EuiFlexItem>
                  <EuiFieldText
                    value={this.state.loadId}
                    onChange={e => this.setState({ loadId: e.target.value })}
                  />
                </EuiFlexItem>
                <EuiFlexItem>
                  <EuiButton onClick={() => this.load(this.state.loadId)}>
                    Load Entity
                  </EuiButton>
                </EuiFlexItem>
              </EuiFlexGroup>
              <EuiFlexGroup style={{ maxWidth: 500 }}>
                <EuiFlexItem>
                  <EuiButton onClick={() => this.load()}>
                    Load New Entity
                  </EuiButton>
                </EuiFlexItem>
              </EuiFlexGroup>
              <EuiFlexGroup style={{ maxWidth: 500 }}>
                <EuiFlexItem>
                  <EuiButton onClick={() => this.findAll()}>
                    Load All
                  </EuiButton>
                </EuiFlexItem>
              </EuiFlexGroup>
              <EuiFlexGroup style={{ maxWidth: 500 }}>
                <EuiFlexItem>
                  <EuiFieldText
                    value={this.state.entity.getTitle ? this.state.entity.getTitle() : ''}
                    onChange={e => this.onChange(e.target.value, 'title')}
                  />
                </EuiFlexItem>
                <EuiFlexItem grow={false}>
                  <EuiButton
                    onClick={this.save}
                  >
                    Save
                  </EuiButton>
                </EuiFlexItem>
              </EuiFlexGroup>

              <pre>
                {JSON.stringify(this.state.entity, null, 2)}
              </pre>
              <pre>
                {JSON.stringify(this.state.entities, null, 2)}
              </pre>
            </EuiPageContentBody>
          </EuiPageContent>
        </EuiPageBody>
      </EuiPage>
    );
  }
}

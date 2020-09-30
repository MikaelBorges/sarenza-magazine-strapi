/*
 *
 * HomePage
 *
 */

import React, { memo, useState } from 'react';
import Convert from "../../../../services/utils/ComponentService";

// import PropTypes from 'prop-types';
import pluginId from '../../pluginId';
import {
  HeaderNav,
  LoadingIndicator,
  PluginHeader
} from "strapi-helper-plugin";
import { request } from "strapi-helper-plugin";
import Block from '../../components/Block';
import Row from '../../components/Row';
import { Label, Textarea, Button } from "@buffetjs/core";

const getUrl = to =>
  to ? `/plugins/${pluginId}/${to}` : `/plugins/${pluginId}`;

const HomePage = () => {
  const [json, setJson] = useState("");

  const jsonAreaChange = (value) => {
    setJson(value)
  }

  const importJson = async (e) => {
    let data = {};
    try {
       data = Convert(json);
    } catch (e) {
      console.log(e)
      // setState({ analyzing: false }, () => {
      strapi.notification.error(`Import Failed, try again`);
      strapi.notification.error(`${e}`);
      // });
    }

    if (!data) return

    data.data.forEach(async d => {
      const body = {
        component: {
          category: d.category,
          ...d.schema
        }
      }


      try {

        const response = await request("/content-type-builder/components", {
          method: "POST",
          body: body
        });
      } catch (e) {
        console.log(e)
        // setState({ analyzing: false }, () => {
        strapi.notification.error(`Import Failed, try again`);
        strapi.notification.error(`${e}`);
        // });
      }

    });



    // this.setState({ analysis: response, analyzing: false }, () => {
    //   strapi.notification.success(`Analyzed Successfully`);
    // });

  }
  return (
    <div className={"container-fluid"} style={{ padding: "18px 30px" }}>
      <PluginHeader
        title={"Import Components"}
        description={"Import Components from external sources"}
      />
      {/* <HeaderNav
        links={[
          {
            name: "import-component.import.tab.header",
            to: getUrl("")
          }
        ]}
        style={{ marginTop: "4.4rem" }}
      /> */}

      <div className="row">
        <Block title="From JSON" description="Import Component from JSON content" style={{ marginBottom: 12 }}>
          <Row className={"row"}>
            <div className={"col-4"}>
              <Label htmlFor="jsonArea">Import Source</Label>
              <Textarea name="jsonArea" onChange={({ target: { value } }) =>
                jsonAreaChange(value)
              } />
              <Button color="primary" label="Import" onClick={importJson} />
            </div>
          </Row>
        </Block>
      </div>
    </div>
  );
};

export default memo(HomePage);

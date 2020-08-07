import React from 'react';
import { Card } from 'antd';
import { SchemaForm, Form, Field, FormItem, FormButtonGroup, Submit } from '@formily/antd';
import { setup, Input } from '@formily/antd-components';

setup();
export default function Schema(props: any) {
  console.log(props);
  return (
    <>
      <br />
      <Card title="JSX Schema描述">
        <SchemaForm onSubmit={console.log} wrapperCol={{ span: 18 }} labelCol={{ span: 4 }} labelAlign="right" colon>
          <Field name="key" title="姓名" type="string" required x-component-props={{ placeholder: '111111' }} />
          <FormButtonGroup offset={7}>
            <Submit>提交</Submit>
          </FormButtonGroup>
        </SchemaForm>
      </Card>
      <br />
      <Card title="JSX描述">
        <Form onSubmit={console.log} wrapperCol={{ span: 18 }} labelCol={{ span: 4 }} labelAlign="right">
          <FormItem name="key" label="姓名" component={Input} />
          <FormButtonGroup offset={7}>
            <Submit>提交</Submit>
          </FormButtonGroup>
        </Form>
      </Card>
      <br />
    </>
  );
}

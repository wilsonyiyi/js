import React from 'react';
import { Card } from 'antd';
import { SchemaForm, Form, SchemaMarkupField as Field, FormItem, FormButtonGroup, Submit } from '@formily/antd';
import { setup, Input } from '@formily/antd-components';

setup();
export default function Schema(props: any) {
  return (
    <>
      <br />
      <Card title="JSX Schema描述">
        <SchemaForm
          prefix="my-style-"
          // size="large"
          className="hihi"
          previewPlaceholder="详情页的文本态占位符"
          onSubmit={console.log}
          wrapperCol={{ span: 18 }}
          labelCol={{ span: 4 }}
          labelAlign="right"
          colon
        >
          <Field
            description="描述"
            // readOnly
            // writeOnly
            name="key"
            title="姓名"
            type="string"
            enum={[
              {
                label: '111',
                value: 11,
              },
              {
                label: '222',
                value: 22,
              },
            ]}
            // required
            editable={false}
            // visible
            // display={false}
            // x-rules={[{ required: true, message: '必传呀' }]}
            // x-index={2}
            // default={22}
            // const={22}
            x-component-props={{ mode: 'multiple' }}
            maxItems={1}
          />
          <Field
            // multipleOf={3}
            // maximum={2}
            maxLength={3}
            // exclusiveMaximum={2}
            name="key2"
            title="字段2"
            type="number"
            // x-component-props={{ size: 'small' }}
          />
          <FormButtonGroup offset={7}>
            <Submit loading={true} ghost>
              提交
            </Submit>
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

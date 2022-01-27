import React, { useState, useMemo } from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Typography, Button } from 'antd';


const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {

    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

const TableComponent = ({ data, setData }) => {
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');
    const [search, setSearch] = useState('');

    const isEditing = (record) => record.id === editingKey;

    const edit = (record) => {
        form.setFieldsValue({
            name: '',
            username: '',
            phone: '',
            ...record,
        });
        setEditingKey(record.id);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const remove = (idx) => {
        setData(data.filter(user => user.id !== idx))
    };

    const searchUser = useMemo(() => data.filter(user => user.name.toUpperCase().indexOf(search.toUpperCase()) !== -1), [search, data]);

    const onAddUser = () => {
        const idx = Math.floor(Math.random() * 10000);
        const newUser = {
            id: idx,
            key: String(idx),
            name: 'Name',
            username: 'UserName',
            phone: '010-692-6593 x09125'
        }
        setData([newUser, ...data]);

    }

    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => key === item.id);

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, { ...item, ...row });
                setData(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const columns = [
        {
            title: 'name',
            dataIndex: 'name',
            width: '25%',
            editable: true,
        },
        {
            title: 'username',
            dataIndex: 'username',
            width: '15%',
            editable: true,
        },
        {
            title: 'phone',
            dataIndex: 'phone',
            width: '40%',
            editable: true,
        },
        {
            title: 'Action',
            dataIndex: 'Action',
            render: (_, record) => {

                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link
                            onClick={() => save(record.id)}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            Save
                        </Typography.Link>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <a>Cancel</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                        Edit
                    </Typography.Link>
                );
            },
        },
        {
            title: 'Delete',
            key: 'delete',
            render: (text, record) => (
                <Typography.Link
                    onClick={() => remove(record.id)}
                    style={{
                        marginRight: 8,
                    }}
                >
                    Delete
                </Typography.Link>
            ),
        },
    ];
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'age' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });
    return (
        <Form form={form} component={false}>
            <Button
                style={{ marginBottom: '10px' }}
                onClick={onAddUser}>
                Add User
            </Button>
            <Input
                style={{ marginBottom: '10px' }}
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <Table
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                bordered
                dataSource={searchUser}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={{
                    onChange: cancel,
                }}
            />
        </Form>
    );
};

export default TableComponent;
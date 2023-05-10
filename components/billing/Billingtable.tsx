import { Skeleton, Table } from 'antd';

export default function BillingTable({ loading }: { loading?: boolean }) {
    // const loadingStateData: any[] = [
    //     {
    //         key: '1',
    //         date: (
    //             <Skeleton.Input
    //                 size="small"
    //                 active
    //                 style={{ minWidth: '50px' }}
    //             />
    //         ),
    //         operation: <Skeleton.Input active style={{ minWidth: '100px' }} />,
    //         operationType: (
    //             <Skeleton.Input
    //                 size="small"
    //                 active
    //                 style={{ minWidth: '50px' }}
    //             />
    //         ),
    //         status: (
    //             <Skeleton.Input
    //                 size="small"
    //                 active
    //                 style={{ minWidth: '50px' }}
    //             />
    //         ),
    //         cost: (
    //             <Skeleton.Input
    //                 size="small"
    //                 active
    //                 style={{ minWidth: '50px' }}
    //             />
    //         ),
    //         balance: (
    //             <Skeleton.Input
    //                 size="small"
    //                 active
    //                 style={{ minWidth: '50px' }}
    //             />
    //         ),
    //         notes: (
    //             <Skeleton.Input
    //                 size="small"
    //                 active
    //                 style={{ minWidth: '50px' }}
    //             />
    //         ),
    //     },
    //     {
    //         key: '2',
    //         date: (
    //             <Skeleton.Input
    //                 size="small"
    //                 active
    //                 style={{ minWidth: '50px' }}
    //             />
    //         ),
    //         operation: <Skeleton.Input active style={{ minWidth: '100px' }} />,
    //         operationType: (
    //             <Skeleton.Input
    //                 size="small"
    //                 active
    //                 style={{ minWidth: '50px' }}
    //             />
    //         ),
    //         status: (
    //             <Skeleton.Input
    //                 size="small"
    //                 active
    //                 style={{ minWidth: '50px' }}
    //             />
    //         ),
    //         cost: (
    //             <Skeleton.Input
    //                 size="small"
    //                 active
    //                 style={{ minWidth: '50px' }}
    //             />
    //         ),
    //         balance: (
    //             <Skeleton.Input
    //                 size="small"
    //                 active
    //                 style={{ minWidth: '50px' }}
    //             />
    //         ),
    //         notes: (
    //             <Skeleton.Input
    //                 size="small"
    //                 active
    //                 style={{ minWidth: '50px' }}
    //             />
    //         ),
    //     },
    // ];
    const dataSource = [
        {
            key: '1',
            date: '10/09/2022',
            operation: '10/01/2022 to 10/31/2022',
            operationType: 32,
            status: 'status',
            cost: '3000',
            balance: '4000',
            notes: 'Invoice',
        },
        {
            key: '2',
            date: '2023/02/02',
            operation: 'Incoming balance',
            operationType: 32,
            status: 'status',
            cost: '3000',
            balance: '4000',
            notes: 'invoice',
        },
        {
            key: '1',
            date: '10/09/2022',
            isIncomingBalance: true,
            operation: '',
            operationType: '',
            status: '',
            cost: '3000',
            balance: '4000',
            notes: '',
        },
        {
            key: '1',
            date: '10/09/2022',
            operation: '10/01/2022 to 10/31/2022',
            operationType: 32,
            status: 'status',
            cost: '3000',
            balance: '4000',
            notes: 'invoice',
        },
        {
            key: '1',
            date: '10/09/2022',
            operation: '10/01/2022 to 10/31/2022',
            operationType: 32,
            status: 'status',
            cost: '3000',
            balance: '4000',
            notes: 'invoice',
        },
        {
            key: '1',
            date: '10/09/2022',
            operation: '10/01/2022 to 10/31/2022',
            operationType: 32,
            status: 'status',
            cost: '3000',
            balance: '4000',
            notes: 'invoice',
        },
        {
            key: '1',
            date: '10/09/2022',
            isIncomingBalance: true,
            operation: '',
            operationType: '',
            status: '',
            cost: '3000',
            balance: '4000',
            notes: '',
        },
        {
            key: '1',
            date: '10/09/2022',
            operation: '10/01/2022 to 10/31/2022',
            operationType: 32,
            status: 'status',
            cost: '3000',
            balance: '4000',
            notes: 'invoice',
        },
        {
            key: '1',
            isTotal: true,
            date: '10/09/2022',
            operation: '',
            operationType: '',
            status: '',
            cost: '3000',
            balance: '4000',
            notes: '',
        },
    ];
    const loadingStateColumns = [
        {
            title: 'Date',
            dataIndex: 'date',
            width: '22%',
            key: 'date',
            className: 'text-[#9A9A9A] text-base font-semibold',
            render: (text: any, record: any) => {
                const colSpan = record.isIncomingBalance ? 2 : 1;
                return (
                    <td colSpan={colSpan}>
                        {record.isTotal && (
                            <div
                                style={{
                                    color: '#FF0047',
                                    fontSize: '18px',
                                    fontWeight: 700,
                                }}
                            >
                                <Skeleton.Input
                                    size="small"
                                    active
                                    style={{ minWidth: '50px' }}
                                />
                            </div>
                        )}
                        {record.isIncomingBalance && (
                            <div className="text-gray-450 text-lg font-bold">
                                <Skeleton.Input
                                    active
                                    style={{ minWidth: '100px' }}
                                />
                            </div>
                        )}
                        {!record.isTotal && (
                            <>
                                {record.isIncomingBalance ? (
                                    ''
                                ) : (
                                    <div>
                                        <Skeleton.Input
                                            size="small"
                                            active
                                            style={{ minWidth: '50px' }}
                                        />
                                    </div>
                                )}
                            </>
                        )}
                    </td>
                );
            },
        },
        {
            title: 'Operation',
            className: 'text-[#9A9A9A] text-base font-semibold',
            dataIndex: 'operation',
            key: 'operation',
            render: (text: any, record: any) => (
                <div>
                    {!record.isTotal && (
                        <div>
                            <Skeleton.Input
                                active
                                style={{ minWidth: '100px' }}
                            />
                        </div>
                    )}
                </div>
            ),
        },
        {
            title: 'Operation Type',
            className: 'text-[#9A9A9A] text-base font-semibold',
            dataIndex: 'operationType',
            key: 'operationType',
            render: () => (
                <Skeleton.Input
                    size="small"
                    active
                    style={{ minWidth: '50px' }}
                />
            ),
        },
        {
            title: 'Status',
            className: 'text-[#9A9A9A] text-base font-semibold',
            dataIndex: 'status',
            key: 'status',
            render: () => (
                <Skeleton.Input
                    size="small"
                    active
                    style={{ minWidth: '50px' }}
                />
            ),
        },
        {
            title: 'Cost',
            className: 'text-[#9A9A9A] text-base font-semibold',
            width: '150px',
            dataIndex: 'cost',
            key: 'cost',
            render: (text: any, record: any) => (
                <div>
                    {record.isTotal && (
                        <div
                            style={{
                                color: '#FF0047',
                                fontSize: '18px',
                                fontWeight: 700,
                            }}
                        >
                            <Skeleton.Input
                                size="small"
                                active
                                style={{ minWidth: '50px' }}
                            />
                        </div>
                    )}
                    {!record.isTotal && (
                        <>
                            {record.isIncomingBalance ? (
                                <Skeleton.Input
                                    size="small"
                                    active
                                    style={{ minWidth: '50px' }}
                                />
                            ) : (
                                <Skeleton.Input
                                    size="small"
                                    active
                                    style={{ minWidth: '50px' }}
                                />
                            )}
                        </>
                    )}
                </div>
            ),
        },
        {
            title: 'Balance',
            className: 'text-[#9A9A9A] text-base font-semibold',
            dataIndex: 'balance',
            width: '150px',
            key: 'balance',
            render: (text: any, record: any) => (
                <div>
                    {record.isTotal && (
                        <div
                            style={{
                                color: '#FF0047',
                                fontSize: '18px',
                                fontWeight: 700,
                            }}
                        >
                            <Skeleton.Input
                                size="small"
                                active
                                style={{ minWidth: '50px' }}
                            />
                        </div>
                    )}
                    {!record.isTotal && (
                        <>
                            {record.isIncomingBalance ? (
                                <div className="text-gray-450 text-2lg font-bold">
                                    <Skeleton.Input
                                        size="small"
                                        active
                                        style={{ minWidth: '50px' }}
                                    />
                                </div>
                            ) : (
                                <div>
                                    {' '}
                                    <Skeleton.Input
                                        size="small"
                                        active
                                        style={{ minWidth: '50px' }}
                                    />
                                </div>
                            )}
                        </>
                    )}
                </div>
            ),
        },
        {
            title: 'Notes',
            dataIndex: 'notes',
            key: 'notes',
            className: 'text-[#690047]',
            render: (text: any, record: any) => (
                <div>
                    {!record.isTotal && (
                        <>
                            {!record.isIncomingBalance && (
                                <div
                                    className="underline"
                                    onClick={() => handleAction(record, text)}
                                >
                                    <Skeleton.Input
                                        size="small"
                                        active
                                        style={{ minWidth: '50px' }}
                                    />
                                </div>
                            )}
                        </>
                    )}
                </div>
            ),
        },
    ];

    const columns = [
        {
            title: 'Date',
            dataIndex: 'date',
            width: '22%',
            key: 'date',
            className: 'text-[#9A9A9A] text-base font-semibold',
            render: (text: any, record: any) => {
                const colSpan = record.isIncomingBalance ? 2 : 1;
                return (
                    <td colSpan={colSpan}>
                        {record.isTotal && (
                            <div
                                style={{
                                    color: '#FF0047',
                                    fontSize: '18px',
                                    fontWeight: 700,
                                }}
                            >
                                Total
                            </div>
                        )}
                        {record.isIncomingBalance && (
                            <div className="text-gray-450 text-lg font-bold">
                                Incoming balance for October 2022
                            </div>
                        )}
                        {!record.isTotal && (
                            <>
                                {record.isIncomingBalance ? (
                                    ''
                                ) : (
                                    <div>{record.date}</div>
                                )}
                            </>
                        )}
                    </td>
                );
            },
        },
        {
            title: 'Operation',
            className: 'text-[#9A9A9A] text-base font-semibold',
            dataIndex: 'operation',
            key: 'operation',
            render: (text: any, record: any) => (
                <div>
                    {!record.isTotal && (
                        <div>
                            {record.operation && (
                                <div>Expenditure for the period from</div>
                            )}
                            {record.operation}
                        </div>
                    )}
                </div>
            ),
        },
        {
            title: 'Operation Type',
            className: 'text-[#9A9A9A] text-base font-semibold',
            dataIndex: 'operationType',
            key: 'operationType',
        },
        {
            title: 'Status',
            className: 'text-[#9A9A9A] text-base font-semibold',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Cost',
            className: 'text-[#9A9A9A] text-base font-semibold',
            width: '150px',
            dataIndex: 'cost',
            key: 'cost',
            render: (text: any, record: any) => (
                <div>
                    {record.isTotal && (
                        <div
                            style={{
                                color: '#FF0047',
                                fontSize: '18px',
                                fontWeight: 700,
                            }}
                        >
                            $ {record.cost}
                        </div>
                    )}
                    {!record.isTotal && (
                        <>
                            {record.isIncomingBalance ? (
                                <div className="text-gray-450 text-2lg font-bold">
                                    $ {record.cost}
                                </div>
                            ) : (
                                <div> $ {record.cost}</div>
                            )}
                        </>
                    )}
                </div>
            ),
        },
        {
            title: 'Balance',
            className: 'text-[#9A9A9A] text-base font-semibold',
            dataIndex: 'balance',
            width: '150px',
            key: 'balance',
            render: (text: any, record: any) => (
                <div>
                    {record.isTotal && (
                        <div
                            style={{
                                color: '#FF0047',
                                fontSize: '18px',
                                fontWeight: 700,
                            }}
                        >
                            $ {record.balance}
                        </div>
                    )}
                    {!record.isTotal && (
                        <>
                            {record.isIncomingBalance ? (
                                <div className="text-gray-450 text-2lg font-bold">
                                    $ {record.balance}
                                </div>
                            ) : (
                                <div> $ {record.balance}</div>
                            )}
                        </>
                    )}
                </div>
            ),
        },
        {
            title: 'Notes',
            dataIndex: 'notes',
            key: 'notes',
            className: 'text-[#690047]',
            render: (text: any, record: any) => (
                <div>
                    {!record.isTotal && (
                        <>
                            {!record.isIncomingBalance && (
                                <div
                                    className="underline"
                                    onClick={() => handleAction(record, text)}
                                >
                                    Invoice
                                </div>
                            )}
                        </>
                    )}
                </div>
            ),
        },
    ];

    const handleAction = (record: any, text: any) => {
        console.log(record, 'this is record of actoin button');
        console.log(text, ' this is data index');
    };

    return (
        <div className="billing">
            <Table
                dataSource={dataSource}
                columns={loading ? loadingStateColumns : columns}
                pagination={false}
            />
        </div>
    );
}

it('should not accept camelcase in name and last_name', () => {
    const response = !/^[A-Z][a-z]*$/.test('bGyKVzYJrOQMRPLW');

    expect(response).toBe(true);
});

it('should not accept repeated letters', () => {
    const response = /([a-zA-Z]).*?\1{2,}/.test('Alll');

    expect(response).toBe(true);
});

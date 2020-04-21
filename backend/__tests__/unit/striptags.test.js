it('should remove script tag', () => {
    const string = '<script>alert</script>';
    const striped = string.replace(/<script>/g, '').replace(/<\/script>/g, '');
    expect(striped).toBe('alert');
});

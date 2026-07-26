it("Test signup with valid params", async () => {
    const findUser = jest
        .spyOn(authRepository, "findUserByName")
        .mockResolvedValueOnce(null);

    const insertUser = jest
        .spyOn(authRepository, "insert")
        .mockImplementation(async () => {
            return null;
        });

    const user = await userFactory();
    // Ensure the user has the correct company key (adjust the value as needed)
    user.key = 123456; // Replace with the actual valid key

    await authService.signup(user);

    expect(findUser).toBeCalled();
    expect(insertUser).toBeCalled();
});

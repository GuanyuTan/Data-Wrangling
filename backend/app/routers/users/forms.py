"""
Form Classes to help validate Form Data Accepted.
"""
from fastapi import Request
from typing import List, Optional

class UserCreateForm:
    def __init__(self, request: Request) -> None:
        self.request = request
        self.errors: List=[]
        self.username: Optional[str] = None
        self.email: Optional[str] = None
        self.password: Optional[str] = None
        self.first_name: Optional[str] = None
        self.last_name: Optional[str] = None

    async def load_data(self):
        form = await self.request.form()
        self.username = form.get("username")
        self.email = form.get("email")
        self.password = form.get("password")
        self.first_name = form.get("first_name")
        self.last_name = form.get("last_name")

    async def is_valid(self):
        if not self.username or len(self.username)<=3:
            self.errors.append("Username length should be > 3")
        if not self.email or not (self.email.__contains__("@")):
            self.errors.append("Email is required")
        if not self.password or len(self.password)<=3:
            self.errors.append("Password length should be >3")
        if not self.errors:
            return True
        return False
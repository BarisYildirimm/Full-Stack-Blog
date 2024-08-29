import express from "express";

export const getUsers = (req, res) => {
  try {
    res.json({ message: "success" });
  } catch (error) {
    res.json({ message: "error" });
  }
};

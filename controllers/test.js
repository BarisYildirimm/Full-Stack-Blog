import express from "express";

export const test = async (req, res) => {
  try {
    res.json({ message: "test message" });
  } catch (error) {
    res.json({ message: "test message error" });
  }
};

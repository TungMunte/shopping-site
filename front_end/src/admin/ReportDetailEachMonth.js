import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../security/AuthContext";

export default function ReportDetailEachMonth() {
  const authContext = useAuth();
  useEffect(() => {
    async function getSmartPhones() {
      try {
      } catch (error) {
        console.log(error);
      }
    }
    getSmartPhones();
  }, []);

  return (
    <div className="py-5">
      <style jsx>{``}</style>
      <div>
        <h1>hello</h1>
      </div>
    </div>
  );
}

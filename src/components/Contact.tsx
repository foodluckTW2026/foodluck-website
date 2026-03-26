"use client";

import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "consumer",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 後端串接如有需要再處理
    alert("感謝你的來信！我們會盡快回覆。");
  };

  return (
    <section id="contact" className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left: Info */}
          <div>
            <span className="text-xs font-semibold tracking-widest text-primary uppercase">
              Contact
            </span>
            <h2 className="mt-3 text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-6">
              想合作或有
              <br />
              任何問題？
            </h2>
            <p className="text-gray-500 leading-relaxed mb-8">
              無論你是想加入的商家、媒體夥伴，還是有任何使用上的問題，我們都很樂意聽你說。
            </p>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Email</p>
                <a
                  href="mailto:foodluck2026@gmail.com"
                  className="text-gray-900 font-semibold hover:text-primary transition-colors"
                >
                  foodluck2026@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="name">
                  姓名
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="你的名字"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="role">
                我的身份
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all bg-white"
              >
                <option value="consumer">消費者</option>
                <option value="merchant">商家／餐廳</option>
                <option value="media">媒體／合作夥伴</option>
                <option value="other">其他</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="message">
                訊息
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="告訴我們你想說的..."
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white font-semibold py-4 rounded-full hover:bg-primary/90 hover:-translate-y-0.5 transition-all duration-200 shadow-lg shadow-primary/20"
            >
              送出訊息
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

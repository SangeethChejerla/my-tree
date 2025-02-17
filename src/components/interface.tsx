'use client';

import { motion } from 'framer-motion';
import { FolderOpen, GitFork, Plus, Terminal } from 'lucide-react';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import '../styles/global.css';

interface Project {
  name: string;
  path: string;
}

export default function CursorInterface() {
  const [projects] = useState<Project[]>([
    { name: 'url-to-data', path: 'C:\\Users\\sange\\Desktop' },
    { name: 'web-rag', path: 'C:\\Users\\sange\\Desktop' },
    {
      name: 'secureshare_backend',
      path: 'C:\\Users\\sange\\Desktop\\encryshare',
    },
    { name: 'chat-to-website', path: 'C:\\Users\\sange\\Downloads' },
    { name: 'python&rust', path: 'C:\\Users\\sange\\Desktop' },
  ]);

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activePillStyle, setActivePillStyle] = useState({});
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (hoveredIndex !== null) {
      const hoveredElement = projectRefs.current[hoveredIndex];
      if (hoveredElement) {
        const { offsetTop, offsetHeight, offsetWidth, offsetLeft } =
          hoveredElement;
        setActivePillStyle({
          top: `${offsetTop}px`,
          left: `${offsetLeft}px`,
          height: `${offsetHeight}px`,
          width: `${offsetWidth}px`,
        });
      }
    }
  }, [hoveredIndex]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="w-[800px] p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12">
            <motion.div
              className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-600 rounded"
              animate={{ rotateY: 360 }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: 'linear',
              }}
            />
          </div>
          <div>
            <h1 className="text-2xl font-semibold">Aryayama</h1>
            <a
              href="https://aryayama.vercel.app"
              className="text-sm text-blue-400"
            >
              mysite
            </a>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <ActionCard
            icon={<FolderOpen className="w-5 h-5" />}
            title="Open project"
          />
          <ActionCard
            icon={<GitFork className="w-5 h-5" />}
            title="Clone repo"
          />
          <ActionCard
            icon={<Terminal className="w-5 h-5" />}
            title="Connect via SSH"
          />
        </div>

        {/* Recent Projects */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">Recent projects</h2>
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-full hover:bg-gray-800 transition-colors"
              >
                <Plus className="w-5 h-5" />
              </motion.button>
              <span className="text-gray-400 text-sm">View all (5)</span>
            </div>
          </div>

          <div className="relative">
            {/* Hover background pill */}
            <motion.div
              className="absolute bg-[#0A1824] rounded-lg z-0"
              initial={false}
              animate={activePillStyle}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              style={{
                display: hoveredIndex !== null ? 'block' : 'none',
              }}
            />

            <div className="space-y-1 relative">
              {projects.map((project, index) => (
                <div
                  key={index}
                  ref={(el) => (projectRefs.current[index] = el)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="relative z-10"
                >
                  <ProjectItem project={project} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActionCard({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-[#0A1824] p-4 rounded-lg cursor-pointer transition-colors hover:bg-[#132431] flex items-center gap-3"
    >
      {icon}
      <span className="font-medium text-sm">{title}</span>
    </motion.div>
  );
}

function ProjectItem({ project }: { project: Project }) {
  return (
    <div className="flex justify-between items-center p-3 rounded-lg cursor-pointer">
      <span className="text-sm">{project.name}</span>
      <span className="text-gray-500 text-sm">{project.path}</span>
    </div>
  );
}

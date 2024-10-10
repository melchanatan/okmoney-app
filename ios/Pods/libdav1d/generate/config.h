/*
 * Autogenerated by the Meson build system.
 * Do not edit, your changes will be lost.
 */

#pragma once

#if __aarch64__
#define ARCH_AARCH64 1
#endif

#if __arm__
#define ARCH_ARM 1
#endif

#if __ppc64__
#define ARCH_PPC64LE 1
#endif

#if __i386__ || __x86_64__
#define ARCH_X86 1
#endif

#if __i386__
#define ARCH_X86_32 1
#endif

#if __x86_64__
#define ARCH_X86_64 1
#endif

#define CONFIG_16BPC 1

#define CONFIG_8BPC 1

#define CONFIG_LOG 1

#define ENDIANNESS_BIG 0

// x86_64 need NSAM, but Xcode does not provide.
#if __arm__ || __aarch64__
#define HAVE_ASM 1
#endif

#define HAVE_AS_FUNC 0

#define HAVE_C11_GENERIC 1

#define HAVE_CLOCK_GETTIME 1

#define HAVE_POSIX_MEMALIGN 1

#define HAVE_UNISTD_H 1

#define PIC 3

#define PREFIX 1

#define TRIM_DSP_FUNCTIONS 1

// Define default bit depth 8, but some template source files need to be redefined and compile twice, see `tmpl_16` folder
#ifndef BITDEPTH
#define BITDEPTH 8
#endif

#include "pch.h"
#include "ReactPackageProvider.h"
#include "ReactPackageProvider.g.cpp"

#include "DateTimePickerViewManager.h"

using namespace winrt::Microsoft::ReactNative;

namespace winrt::DateTimePicker::implementation {

  void ReactPackageProvider::CreatePackage(IReactPackageBuilder const& packageBuilder) noexcept {
      packageBuilder.AddViewManager(L"DateTimePickerViewManager", []() { return winrt::make<DateTimePickerViewManager>(); });
  }

}